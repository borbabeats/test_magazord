import { CardProps } from "./types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa";
import ForkIcon from "@/components/UI/icons/forkIcon";

export default function CardHorizontal({...props}: CardProps) {
  return (
    <Card className="w-full" >
      <CardContent sx={{ height: "100%" }}>
        <button>
          {" "}
          <Typography variant="h5" component="div">
            {props.full_name}
          </Typography>
        </button>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>

        <CardActions>
          <button  className="flex gap-2">
            <FaStar /> {props.stargazers_count}
          </button>
          <button className="flex gap-2">
            <ForkIcon /> {props.forks_count}
          </button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
