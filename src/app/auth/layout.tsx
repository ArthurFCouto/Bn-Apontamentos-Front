import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";
import RightPainel from "@/components/app/auth/rightPainel";

const styleLeft: SxProps = {
  display: { xs: "flex", lg: "grid" },
  flexDirection: "column",
  gridTemplateColumns: "1fr 1fr",
  minHeight: "100%",
};

const styleContainerLeft: SxProps = {
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
};

const styleBoxImg = { p: 3, display: { xs: "flex", lg: "none" } };

const styleBoxLeft: SxProps = {
  alignItems: "center",
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  justifyContent: "center",
  p: 3,
};

const styleRight: SxProps = {
  display: { xs: "none", lg: "flex" },
  position: "relative",
  width: "100%",
  height: "100%",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={styleLeft}>
      <Box sx={styleContainerLeft}>
        <Box sx={styleBoxImg}>
          <Box
            component={"img"}
            src={"/assets/logo.png"}
            alt={"BN Engenharia"}
            loading="lazy"
            sx={{ height: "auto", width: 50 }}
          />
        </Box>
        <Box sx={styleBoxLeft}>{children}</Box>
      </Box>
      <Box sx={styleRight}>
        <RightPainel />
      </Box>
    </Box>
  );
}
