import { useCallback } from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { authClient } from "@/services/auth";
import { useUser } from "@/hooks/useUser";
import {
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { Logout, Person, Settings } from "@mui/icons-material";

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

const UserPopover = ({ anchorEl, onClose, open }: UserPopoverProps) => {
  const { user, checkSession } = useUser();
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    await authClient.signOut();

    await checkSession?.();
    router.refresh();
  }, [checkSession, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: "240px" } } }}
    >
      <Box sx={{ p: "16px 20px " }}>
        <Typography variant="subtitle1">{user?.nome}</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.matricula}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        <MenuItem component={RouterLink} href={paths.home} onClick={onClose}>
          <ListItemIcon>
            <Settings fontSize="medium" />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <MenuItem component={RouterLink} href={paths.home} onClick={onClose}>
          <ListItemIcon>
            <Person fontSize="medium" />
          </ListItemIcon>
          Minha conta
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default UserPopover;
