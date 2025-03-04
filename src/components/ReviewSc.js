import MainContent from "./MainContent";
import { Container } from "@mui/material";

const ReviewSc= () => { return(
    <Container sx={{ flex: 1 }}>
    <MainContent
      title="Code Review Generation"
      description="Enhance Your Code Review Process with 360 Code Analytics"
      button="Generate Code Review"
    />
    </Container>

)}
export default ReviewSc;
