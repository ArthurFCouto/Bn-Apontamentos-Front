"use client";

import { useRouter } from "next/navigation";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  AppRegistration,
  Cable,
  ChevronLeft,
  DarkMode,
  Home,
  LightMode,
  Menu,
  SolarPower,
} from "@mui/icons-material";
import {
  Box,
  Drawer as MuiDrawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAppThemeContext } from "@/contexts/theme";
import { paths } from "@/paths";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export interface DrawerMenuProps {
  handleClose: (open: boolean) => void;
  open: boolean;
}

const DrawerMenu = ({ handleClose, open }: DrawerMenuProps) => {
  const router = useRouter();
  const { themeName, toggleTheme } = useAppThemeContext();

  const onClose = () => {
    handleClose(!open);
  };

  return (
    <Drawer onClose={handleClose} variant={"permanent"} open={open}>
      <DrawerHeader>
        <IconButton onClick={onClose}>
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key={"home"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => router.push(paths.home)}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <Home />
            </ListItemIcon>
            <ListItemText
              primary={"Home"}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={"newNote"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => router.push(paths.apontamento)}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <AppRegistration />
            </ListItemIcon>
            <ListItemText
              primary={"Apontamento"}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key={"cuttingPlane"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => router.push(paths.planoDeCorte)}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <SolarPower />
            </ListItemIcon>
            <ListItemText
              primary={"Plano de Corte"}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
        <ListItem key={"excerpt"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => router.push(paths.trecho)}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              <Cable />
            </ListItemIcon>
            <ListItemText
              primary={"Trecho"}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box marginTop={"auto"}>
        <List>
          <ListItem
            key={"toggleTheme"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              onClick={toggleTheme}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {themeName === "dark" ? <DarkMode /> : <LightMode />}
              </ListItemIcon>
              <ListItemText
                primary={"Tema"}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
