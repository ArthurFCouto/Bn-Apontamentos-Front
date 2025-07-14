"use client";

import { useState } from "react";
import DrawerMenu from "../drawerMenu";
import UserPopover from "../userPopover";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { useUser } from "@/hooks/useUser";
import { usePopover } from "@/hooks/usePopover";

const styleHeader: SxProps<Theme> = {
  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
  backgroundColor: (theme) => theme.palette.background.paper,
  position: "sticky",
  top: 0,
  zIndex: (theme) => theme.zIndex.appBar,
};

const styleStack: SxProps = {
  alignItems: "center",
  justifyContent: "flex-end",
  minHeight: {
    xs: "56px",
    sm: "64px",
  },
  px: 2,
};

const MainNav = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { user } = useUser();
  const userPopover = usePopover<HTMLDivElement>();
  const theme = useTheme();
  const smUpScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Box component="header" marginLeft={smUpScreen ? 8 : 0} sx={styleHeader}>
        <Stack direction="row" spacing={2} sx={styleStack}>
          <Tooltip title="Notificações">
            <Badge badgeContent={0} color="success" variant="dot">
              <IconButton>
                <Notifications />
              </IconButton>
            </Badge>
          </Tooltip>
          <Avatar
            onClick={userPopover.handleOpen}
            ref={userPopover.anchorRef}
            src={user?.avatar}
            sx={{ cursor: "pointer" }}
          >
            {!user?.avatar && user?.nome.slice(0, 1)}
          </Avatar>
        </Stack>
      </Box>
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />
      <DrawerMenu
        handleClose={(open) => {
          setOpenDrawer(open);
        }}
        open={openDrawer}
      />
    </>
  );
};

export default MainNav;
