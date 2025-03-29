import ListMain from "@/components/list_main";
import Sidebar from "@/components/sidebar";
import Container from "@mui/material/Container";

export default async function Home() {
  return (
      <Container 
      sx={{ display: 'flex', 
            flexDirection: { 
              xs: 'column', 
              md: 'row' 
              },
          gap: 4, 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
        }} >
        <Sidebar />
        <ListMain />
      </Container>
  );
}