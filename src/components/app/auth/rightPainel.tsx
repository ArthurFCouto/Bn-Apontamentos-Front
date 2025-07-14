import { Box, SxProps } from "@mui/material";

const styleBackgroundRight: SxProps = {
  position: "absolute",
  inset: 0,
  backgroundImage: "url('/assets/background.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "rgba(255,255,255,0.7)",
  backgroundBlendMode: "overlay",
  zIndex: 1,
};

const styleBoxRight: SxProps = {
  position: "relative",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};

const RightPainel = () => {
  return (
    <Box sx={styleBackgroundRight}>
      <Box sx={styleBoxRight}>
        <Box
          component={"img"}
          src={"/assets/logo.png"}
          alt={"BN Engenharia"}
          loading="lazy"
          sx={{ height: "auto", width: 200 }}
        />
      </Box>
    </Box>
  );
};

export default RightPainel;
