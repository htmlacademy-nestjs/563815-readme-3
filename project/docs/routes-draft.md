# Routes Draft

## users.com

### POST users.com/api/auth/new-user

email unique; date created; password hash bcrypt;

```typescript
export class CreateUserDto {
  public email: string;
  public name: string;
  public password: string;
  public passwordConfirmation: string;
}
```

```typescript
export class CreateUserResponse {
  public message: string;
}
```

```typescript
export class CreateUserErrorResponse {
  public errors: string[];
}
```

### POST users.com/api/auth/login

```typescript
export class LoginUserDto {
  public email: string;
  public password: string;
}
```

```typescript
export class LoginUserResponse {
  public accessToken: string;
}
```

```typescript
export class LoginUserErrorResponse {
  public error: string;
}
```

### POST users.com/api/auth/change-password

```typescript
export class ChangePasswordDto {
  public id: string;
  public oldPassword: string;
  public newPassword: string;
  public newPasswordConfirmation: string;
}
```

```typescript
export class ChangePasswordResponse {
  public message: string;
}
```

```typescript
export class ChangePasswordErrorResponse {
  public error: string;
}
```

### POST users.com/api/auth/logout

```typescript
export class LogoutUserDto {
  public id: string;
}
```

```typescript
export class LogoutUserResponse {
  public message: string;
}
```

```typescript
export class LogoutUserErrorResponse {
  public error: string;
}
```

### GET users.com/api/users/:id

```typescript
export class GetUserDto {
  public id: string;
}
```

```typescript
export class GetUserResponse {
  public id: string
  public registrationDate: string
  public email: string
  public name: string
  public photoUrl: string
  public postsCount: string // ANOTHER APP
  public followersCount: string // ANOTHER APP
}
```

```typescript
export class GetUserErrorResponse {
  public error: string;
}
```

## blog.com

```typescript
export type PostType = "video" | "text" | "quote" | "photo" | "link";
```

```typescript
export type PostStatus = "draft" | "published" | "archived";
```

```typescript
export class PostTag {
  public id: string;
  public name: string;
}
```

### POST blog.com/api/posts/new/:type

original author, author, creation date, publication date, status, isRepost, original post id

```typescript
export class CreateVideoPostDto {
  public title: string;
  public url: string;
  public tags: PostTag[];
}
```

```typescript
export class CreateTextPostDto {
  public title: string;
  public announcement: string;
  public text: string;
  public tags: PostTag[];
}
```

```typescript
export class CreateQuotePostDto {
  public text: string;
  public quoteAuthor: string;
  public tags: PostTag[];
}
```

```typescript
export class CreatePhotoPostDto {
  public title: string;
  public url: string;
  public tags: PostTag[];
}
```

```typescript
export class CreateLinkPostDto {
  public url: string;
  public description: string;
  public tags: PostTag[];
}
```

```typescript
export class CreatePostResponse {
  public message: string;
}
```

```typescript
export class CreatePostErrorResponse {
  public error: string;
}
```

### POST blog.com/api/repost/:id

```typescript
export class RepostPostDto {
  public id: string;
}
```

```typescript
export class RepostPostResponse {
  public message: string;
}
```

```typescript
export class RepostPostErrorResponse {
  public error: string;
}
```

### GET blog.com/api/posts/:id

```typescript
export class GetPostDto {
  public id: string;
}
```

```typescript
export class GetPostResponse {
  public id: string;
  public title?: string;
  public author: string;
  public originalAuthor: string;
  public creationDate: string;
  public publicationDate: string;
  public status: PostStatus;
  public isRepost: boolean;
  public originalPostId: string;
  public tags: PostTag[];
  public quoteAuthor?: string;
  public text?: string;
  public announcement?: string
}
```

```typescript
export class GetPostErrorResponse {
  public error: string;
}
```

### GET blog.com/api/posts/:id/likes

## photos.com

### POST users.com/api/new

```typescript
export class UploadPictureDto {
  public photo: string;
}
```

```typescript
export class NewPictureResponse {
  public photoUrl: string;
}
```

```typescript
export class NewPictureErrorResponse {
  public error: string;
}
```
