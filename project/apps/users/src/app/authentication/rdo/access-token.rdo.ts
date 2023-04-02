import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenRdo {
  @ApiProperty({
    description: "Access token",
    example: "#hashstring_"
  })
  @Expose()
  public accessToken: string;
}
