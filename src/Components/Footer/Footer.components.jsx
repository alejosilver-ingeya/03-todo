import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
export const FooterComponents = ({ remainingTasks }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        py: 1,
        width: "100%",
        position:
          remainingTasks && remainingTasks > 5 ? "relative" : "absolute",
        bottom: 0,
      }}
    >
      <Typography variant="body2">
        Diseñado por Alejandro Yopasa &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

FooterComponents.propTypes = {
  remainingTasks: PropTypes.number.isRequired,
};
