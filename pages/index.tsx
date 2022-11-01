import { Container } from "@mui/material";
import ScheduleList from "../components/schedule/ScheduleList";

const IndexPage = () => (
  <Container maxWidth="sm" sx={{ my: 2 }}>
    <ScheduleList />
  </Container>
);
export default IndexPage;
