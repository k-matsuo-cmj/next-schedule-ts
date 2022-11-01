import { Container } from "@mui/material";
import CalendarBoard from "../components/schedule/CalendarBoard";
import ScheduleList from "../components/schedule/ScheduleList";

const IndexPage = () => (
  <Container maxWidth="lg" sx={{ my: 2 }}>
    <CalendarBoard />
    {/* <ScheduleList /> */}
  </Container>
);
export default IndexPage;
