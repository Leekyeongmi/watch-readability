import styled from 'styled-components';

const Text = styled.div`
  white-space: pre-line;
  word-break: ${(props) => props.wordBreak || 'break-word'};
  margin: ${(props) => props.margin};
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.font};
  ${(props) =>
    props.typo ? props.theme.fonts[props.typo] : props.theme.fonts.body02M};
`;

const TextEllipsis = styled(Text)`
  word-break: ${(props) => props.wordBreak || 'break-word'};
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.line ?? 2};
  overflow: hidden;
`;

export { Text, TextEllipsis };
