import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome Examiner of  <b>Programming Hero!</b><br> I know you are checking this route.<br> Please check this Assignment-2 <br>Thank you"
  );
});

export default app;
