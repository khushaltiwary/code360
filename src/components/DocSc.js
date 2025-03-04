import MainContent from "./MainContent";
import { Container } from "@mui/material";

const DocSc= () => { return(
    <Container sx={{ flex: 1 }}>
    <MainContent
      title="Document Generation"
      description="Streamline Your Code Document Generation with 360 Code Analytics"
      button="Generate Code Document"
    />
    </Container>

)}
export default DocSc;
