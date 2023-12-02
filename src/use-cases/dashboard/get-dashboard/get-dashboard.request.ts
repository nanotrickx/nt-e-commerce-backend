import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetDashboardRequestParams {
    @ApiPropertyOptional()
    time: string;
}