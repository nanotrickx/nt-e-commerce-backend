import { UpdatePresignRequest } from './update-request';

interface s3PresignRequest {
    fileName: string;
}

export class UpdatePresignMapper {
  public mapToCreateRequest(source: UpdatePresignRequest): s3PresignRequest{
    const response: s3PresignRequest = {
      fileName: source.fileName
    };
    return response;
  }
}
