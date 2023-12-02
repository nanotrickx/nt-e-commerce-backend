import { CreatePresignRequest } from './create-request';

interface s3PresignRequest {
    filePath: string;
    fileExtension: string;
}

export class CreatePresignMapper {
  public mapToCreateRequest(source: CreatePresignRequest): s3PresignRequest{
    const response: s3PresignRequest = {
      filePath: source.filePath,
      fileExtension: source.fileExtension
    };
    return response;
  }
}
