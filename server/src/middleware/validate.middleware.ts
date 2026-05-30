import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

// Strips the leading source prefix (body, query, params) from Zod error paths
const formatFieldPath = (path: (string | number)[]): string => {
  const sourcePrefixes = ['body', 'query', 'params'];
  if (path.length > 1 && sourcePrefixes.includes(String(path[0]))) {
    return path.slice(1).join('.');
  }
  return path.join('.');
};

// Validates the request body against a Zod schema
export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.issues.map((err: any) => ({
            field: formatFieldPath(err.path),
            message: err.message,
          })),
        });
      }
      return next(error);
    }
  };
};
