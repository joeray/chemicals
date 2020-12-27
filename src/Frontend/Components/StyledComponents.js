import styled from 'styled-components';
import { ReactComponent as Magnif } from '../Assets/magnifyingglass.svg';
import theme from '../Styles/theme';

export const SearchButton = styled(Magnif)`
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    fill: ${theme.colours.searchButtonHover};
  }
`;
