import { Container } from "@mui/material";
import MonthlyBoard from "../components/schedule/MonthlyBoard";
import ScheduleList from "../components/schedule/ScheduleList";

const IndexPage = () => (
  <Container maxWidth="lg" sx={{ my: 2 }}>
    <MonthlyBoard />
    {/* <ScheduleList /> */}
  </Container>
);
export default IndexPage;
