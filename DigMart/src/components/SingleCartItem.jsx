import React, { useState } from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { useCtx } from "../context/AppContext";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid teal;
`;

const ProductSize = styled.span``;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

export default function SingleCartItem({ item }) {
  const { removeCartItem, increment, decrement } = useCtx();
  return (
    <Product>
      <ProductDetail>
        <Image src={item.img} />
        <Details>
          <ProductName>
            <b>Product: </b>
            {item.title}
          </ProductName>
          <ProductId>
            <b>ID: </b>
            {item.id}
          </ProductId>
          <ProductColor color={item.color} />
          <ProductSize>
            <b>Size: </b>
            {item.size}
          </ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <Add
            style={{
              cursor: "pointer",
            }}
            onClick={() => increment(item.id)}
          />
          <ProductAmount>{item.count}</ProductAmount>
          <Remove
            style={{
              cursor: "pointer",
            }}
            onClick={() => decrement(item.id)}
          />
        </ProductAmountContainer>
        <ProductPrice>{item.price * item.count} CFX</ProductPrice>
        <button
          style={{
            background: "teal",
            color: "white",
            borderRadius: "30px",
            padding: "5px 15px",
            marginTop: "20px",
            cursor: "pointer",
          }}
          onClick={() => removeCartItem(item.id)}
        >
          REMOVE
        </button>
      </PriceDetail>
    </Product>
  );
}
