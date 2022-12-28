import styled, { css, keyframes } from "styled-components";
import MuiButton from "@mui/material/Button";
import { ButtonProps } from "./button.types";
import ReloadLeftIcon from "../icons/reload-left.icon";

const rotate = keyframes` 
  from {
    transform: rotate(0deg);
  } to {
  transform: rotate(-360deg);
    }
`;

const calcResponsiveSize = (px: number, fontSize = 16) =>
  `${(px / fontSize).toString()}em`;

export const StyledProgress = styled(ReloadLeftIcon)`
  position: absolute;
  animation: ${rotate} 2s linear;
  animation-iteration-count: infinite;
  color: #fff;
  width: ${calcResponsiveSize(20)};
  height: ${calcResponsiveSize(20)};
  .MuiButton-outlined & {
    color: ${(props) => props.theme.palette.primary.dark};
  }
`;

// const iconButtonStyles = css`
//   min-width: unset;
//   &.MuiButton-sizeSmall {
//     padding-left: 10px;
//     padding-right: 10px;
//   }
//   &.MuiButton-sizeMedium {
//     padding-left: 15px;
//     padding-right: 15px;
//   }
//   &.MuiButton-sizeLarge {
//     padding-left: 19px;
//     padding-right: 19px;
//   }
//
//   &.MuiButton-outlinedSizeLarge {
//     padding-left: 17px;
//     padding-right: 17px;
//   }
//
//   &.MuiButton-outlinedSizeSmall {
//     padding: 0.5em 1.5em;
//   }
//
//   &.MuiButton-outlinedSizeMedium {
//     padding: 0.75em 1.5em;
//   }
// `;

const sizesStyles = css`
  &.MuiButton-sizeSmall {
    padding: ${calcResponsiveSize(6)};
  }
  &.MuiButton-sizeMedium {
    padding: ${calcResponsiveSize(10)};
  }
  &.MuiButton-sizeLarge {
    padding: ${calcResponsiveSize(14)};
  }
  &.MuiButton-outlinedSizeLarge {
    padding: ${calcResponsiveSize(13)};
  }
  &.MuiButton-outlinedSizeSmall {
    padding: ${calcResponsiveSize(4)};
  }
  &.MuiButton-outlinedSizeMedium {
    padding: ${calcResponsiveSize(8)};
  }
`;

const loadingStyles = css`
  && {
    color: transparent;
    pointer-events: none;
  }
`;

export const StyledButton = styled(MuiButton).withConfig({
  shouldForwardProp: (prop) => !["loading", "buttonType"].includes(prop),
})<ButtonProps>`
  position: relative;
  border-radius: 0;
  outline: none;
  text-align: center;
  font-weight: 400;
  border-width: ${calcResponsiveSize(2)};

  &:hover {
    border-width: ${calcResponsiveSize(2)};
  }
  ${sizesStyles};
  .MuiButton-startIcon,
  .MuiButton-endIcon {
    width: ${calcResponsiveSize(18)};
  }

  .MuiButton-startIcon {
    margin-right: 11px;
  }
  .MuiButton-endIcon {
    margin-left: 11px;
  }

  &.MuiButton-outlined {
    color: ${(props) => props.theme.palette.primary.dark} !important;
    border: 1px solid ${(props) => props.theme.palette.primary.dark} !important;
  }

  ${(props) => (props.loading ? loadingStyles : null)};

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;
