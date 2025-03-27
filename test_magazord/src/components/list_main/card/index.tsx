import Link from "next/link";
import { CardProps } from "./types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa";
import ForkIcon from "@/components/UI/icons/forkIcon";

export default function CardHorizontal({
  full_name,
  html_url,
  description,
  stargazers_count,
  forks_count,
}: CardProps) {
  return (
    <Card className="w-full" style={{ minWidth: "320px", maxWidth: "768px" }}>
      <CardContent sx={{ height: "100%" }}>
        <Link href={html_url}>
          {" "}
          <Typography variant="h5" component="div">
            {full_name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <CardActions>
          <Link href={html_url} className="flex gap-2">
            <FaStar /> {stargazers_count}
          </Link>
          <Link href={html_url} className="flex gap-2">
            <ForkIcon /> {forks_count}
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
}
