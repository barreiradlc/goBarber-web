import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span{
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    visibility: hidden;
    opacity: 0;
    transition: opacity .4s;

    position: absolute;
    bottom: calc(100% + 12px);
    color: #312e21;
    left: 50%;
    transform: translateX(-50%);

    &::before{
        content: '';
        border-style: solid;
        border-color: #ff9000 transparent;
        border-width: 6px 6px 0 6px;
        left: 50%;
        top: 100%;
        position: absolute;
        transform: translateX(-50%);
    }
  }

  &:hover span{
    opacity: 1;
    visibility: visible;
  }
`;
