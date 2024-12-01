import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const DashboardCard = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => {
  return (
    <Card className="w-full bg-muted drop-shadow-md">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-full text-wrap">{description}</CardContent>
      <CardFooter>
        <Link href={`/dashboard/${link}`} className="w-full">
          <Button className="w-full capitalize" variant="outline">
            {link} <ExternalLink />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
