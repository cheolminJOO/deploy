import styled from 'styled-components';
import { LuPencil } from 'react-icons/lu';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { FaRegCircleCheck } from 'react-icons/fa6';
// 
export const CommentsWrapperDiv = styled.div`
  height: 300px;
`;
export const CommentBox = styled.div`
  height: 250px;
  border-radius: 4px;
  background: #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CommentBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const CommentWriterSpan = styled.span`
  color: #f00;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CommentContent = styled.span`
  color: #505050;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const CommentHeaderDiv = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
`;

export const DeepCircleImg = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px;
`;

export const CommentFooterWrapDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const InputBoxDiv = styled.input`
  background-color: white;
  width: 260px;
  height: 47px;
  border-radius: 28px;
  margin-left: 10px;
`;

export const SubmitButton = styled.button`
  color: #fff;
  border-radius: 9px;
  background: #858585;
  width: 61px;
  height: 47px;
  flex-shrink: 0;
  margin-left: 20px;
  border: 0;
  cursor: pointer;
`;

export const CommentWriterBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentWrapperDiv = styled.div``;

export const ButtonWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

export const PencilBtn = styled(LuPencil)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const TrashButton = styled(FaRegTrashAlt)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export const ConfrimImg = styled(FaRegCircleCheck)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const CancelImg = styled(MdOutlineCancel)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const CommentTextArea = styled.textarea`
  width: 200px;
  height: 50px;
`;
