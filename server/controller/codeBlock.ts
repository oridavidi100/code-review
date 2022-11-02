import { NextFunction, Request, Response } from 'express';

import { CodeBlock } from '../db/CodeBlock';

import { CodeBlock as CodeBlocktype } from '../@types/CodeBlock';

exports.findAllCodeBlocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const codeBlock = await CodeBlock.find().select({ title: 1, name: 1 });

    res.send(codeBlock);
  } catch {}
};
