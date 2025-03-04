import MainContent from "./MainContent";
import { Container } from "@mui/material";

const TestCaseSc= () => { return(
    <Container sx={{ flex: 1 }}>
    <MainContent
      title="Test Case Generation"
      description="Accelerate Your Testing Process with 360 Code Analytics"
      button="Generate Test Cases"
    />
    </Container>

)}
export default TestCaseSc;
