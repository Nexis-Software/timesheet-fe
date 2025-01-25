import {
  Avatar,
  Backdrop,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getTasksSummary } from "../api/tasksApi";
import LoadingGif from "../loading.gif";
import styles from "../styles/dashboard.module.css";
import { DEFAULT_USER, YearMonthOptions } from "../utils/defaults";

const Dashboard = () => {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : DEFAULT_USER;

  const currentTask = "Implementing Dashboard Features";

  const today = new Date();
  const currentMonthDay = today.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const [summary, setSummary] = React.useState(null);
  const [summaryLoading, setSummaryLoading] = React.useState(true);
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = today.getFullYear();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}`;
  const currentYear = today.getFullYear();
  const currentMonth = today.toLocaleString("en-US", { month: "long" });
  const [selectedYearMonth, setSelectedYearMonth] = React.useState(
    `${currentYear} ${currentMonth}`
  );

  useEffect(() => {
    getSummary();
  }, [selectedYearMonth]);

  const getSummary = async () => {
    setSummaryLoading(true);
    try {
      const [year, monthName] = selectedYearMonth.split(" ");
      const month = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}`;

      const response = await getTasksSummary({
        userId: DEFAULT_USER._id,
        month: formattedDate,
      });
      setSummary(response?.data || null);
    } catch (error) {
      toast.error("Error fetching summary");
    } finally {
      setTimeout(() => {
        setSummaryLoading(false);
      }, 2000);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedYearMonth(event.target.value);
  };

  return (
    <Container sx={{ marginBottom: "50px" }}>
      <Box textAlign="center" mt={5}>
        <Link
          to={DEFAULT_USER.linkedInProfile}
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar
            alt={parsedUser?.firstName}
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto",
              border: "4px solid #04bc00",
              padding: "4px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundColor: "transparent",
            }}
          >
            <img
              src={parsedUser?.profilePicture}
              alt={parsedUser?.firstName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Avatar>
        </Link>

        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Hola! Welcome
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ marginTop: "-10px", marginBottom: "20px" }}
        >
          It's me {parsedUser?.firstName} {parsedUser?.lastName},{" "}
          {parsedUser?.position} at {parsedUser?.company}.
        </Typography>

        <FormControl variant="outlined" sx={{ minWidth: 200, mb: 3 }}>
          {/* <label id="year-month-label">Year-Month</InputLabel> */}
          <select
            labelId="year-month-label"
            value={selectedYearMonth}
            onChange={handleDropdownChange}
            // label="Year-Month"
          >
            {YearMonthOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormControl>

        {summaryLoading ? (
          <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={summaryLoading}
          >
            <div class="loading">
              <img src={LoadingGif} alt="Loading" />
            </div>
            <div class="mouse original" />
          </Backdrop>
        ) : (
          <>
            <div className={styles.timelineContainer}>
              <div className={styles.timelineItem}>
                <h6>Company</h6>
                <p>
                  <img
                    src={DEFAULT_USER.companyLogo}
                    alt={DEFAULT_USER.company}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className={styles.companyLogo}
                  />
                </p>
              </div>

              <div className={styles.timelineItem}>
                <h6>This Month's Total Hours</h6>
                <p>{summary?.totalHours || 0} hours</p>
              </div>

              <div className={styles.timelineItem}>
                <h6>Currently Working On</h6>
                <p>
                  {summary &&
                  summary?.latestInProgressTask &&
                  summary?.latestInProgressTask?.name?.length > 25
                    ? `${summary?.latestInProgressTask?.name.substring(
                        0,
                        25
                      )}...`
                    : summary?.latestInProgressTask?.name || "-"}
                </p>
              </div>

              <div className={styles.timelineItem}>
                <h6>Current Sprint</h6>
                <p>{summary?.currentSprint || "-"}</p>
              </div>

              <div className={styles.timelineItem}>
                <h6>Current Month and Day</h6>
                <p>{currentMonthDay}</p>
              </div>

              <div className={styles.timelineItem}>
                <h6>This Week's Total Hours</h6>
                <p>{summary?.weeklyHours || 0} hours</p>
              </div>

              <div className={styles.timelineItem}>
                <h6>Time Spent on Meetings</h6>
                <p>{summary?.meetingHours || 0} hours</p>
              </div>
            </div>

            {/* ========================================================================== */}

            <div className={styles.dashboardGrid}>
              <div className={styles.toDoCard}>
                <h6>To-do Tasks</h6>
                <div className={styles.toDoMiddleSection}>
                  <h1>{summary?.statusCounts?.toDo || 0}</h1>
                  <p>Tasks</p>
                </div>
                <div className={styles.toDoBottomSection}>
                  <p>
                    Total hours: {summary?.timeSpentByStatus?.toDo || 0} hours
                  </p>
                </div>
              </div>

              <div className={styles.pendingCard}>
                <h6>Pending Tasks</h6>
                <div className={styles.pendingMiddleSection}>
                  <h1>{summary?.statusCounts?.pending || 0}</h1>
                  <p>Tasks</p>
                </div>
                <div className={styles.pendingBottomSection}>
                  <p>
                    Total hours: {summary?.timeSpentByStatus?.pending || 0}{" "}
                    hours
                  </p>
                </div>
              </div>

              <div className={styles.devReviewCard}>
                <h6>Dev Review Tasks</h6>
                <div className={styles.devReviewMiddleSection}>
                  <h1>{summary?.statusCounts?.devReview || 0}</h1>
                  <p>Tasks</p>
                </div>
                <div className={styles.devReviewBottomSection}>
                  <p>
                    Total hours: {summary?.timeSpentByStatus?.devReview || 0}{" "}
                    hours
                  </p>
                </div>
              </div>

              <div className={styles.doneCard}>
                <h6>Done Tasks</h6>
                <div className={styles.doneMiddleSection}>
                  <h1>{summary?.statusCounts?.done || 0}</h1>
                  <p>Tasks</p>
                </div>
                <div className={styles.doneBottomSection}>
                  <p>
                    Total hours: {summary?.timeSpentByStatus?.done || 0} hours
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* =============================================================================== */}
      </Box>
    </Container>
  );
};

export default Dashboard;
