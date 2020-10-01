/// <reference types="react" />
import { IComment } from './interface';
interface Props {
    comment: IComment;
}
export default function CommentMessage({ comment }: Props): JSX.Element;
export {};
