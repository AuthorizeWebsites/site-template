import { NextApiRequest, NextApiResponse } from "next";

export default function Handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect("/?failure");
  res.end();
}
