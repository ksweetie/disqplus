/// <reference types="react" />
import { IComment } from './interface';
import '../../lib/twitter-wjs';
interface Props {
    comment: IComment;
}
export default function CommentMessage({ comment }: Props): JSX.Element;
export {};
