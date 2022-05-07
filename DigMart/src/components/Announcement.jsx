import { Box } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20;
  font-weight: 500;
`;

const iframe = () => {
  return {
    __html: `<div style="background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px;  font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%;padding:1px;padding: 0px; margin: 0px; width: 100%;"><div style="height:40px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1505&invert_hover=no" width="100%" height="36px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;"></iframe></div></div>`,
  };
};

const Announcement = () => {
  return (
    <>
      <Container>
        <Box>
          <p>
            Your No 1. Marketplace to buy anything with Your Cryptocurrencies
            BTC ETH USDT
          </p>
        </Box>
      </Container>
      <Box dangerouslySetInnerHTML={iframe()} />
    </>
  );
};

export default Announcement;
