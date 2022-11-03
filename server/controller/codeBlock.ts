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

exports.findOneCodeBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const codeBlock = await CodeBlock.findById(id).select({
      content: 1,
      _id: 0,
    });
    res.send(codeBlock).status(200);
  } catch (err) {
    console.log(err);
  }
};

exports.changeCodeBlockName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, newName } = req.body;
    await CodeBlock.findOneAndUpdate({ _id: id }, { name: newName });
    res.send('name of code block changed');
  } catch (err) {
    console.log(err);
  }
};
