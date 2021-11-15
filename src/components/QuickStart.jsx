import { Button, Card, Col, Timeline, Typography } from "antd";
import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import axios from "axios";
import Gradient from "rgt";
const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart({ isServerInfo }) {
  const [subscribed, setSubscribed] = React.useState(false);

  const { Moralis, isInitialized } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();

  React.useEffect(async () => {
    if (isInitialized) {
      console.log(
        `https://api.surgemoon.com/subscribed/0xae619D834F46272abEC9345Ea4525c31F10dDAeC/${walletAddress}`
      );
      axios
        .get(
          `https://api.surgemoon.com/subscribed/0xae619D834F46272abEC9345Ea4525c31F10dDAeC/${walletAddress}`
        )
        .then((response) => {
          console.log(response);
          if (
            response.data.subscribed &&
            response.data.percentageFlow === 100
          ) {
            setSubscribed(true);
          }
        });
    }
  }, [isInitialized, chainId, walletAddress]);

  if (subscribed) {
    return (
      <Col>
        <img
          alt="pikachu"
          src="https://i.pinimg.com/originals/df/87/e6/df87e6cd651457c032375e43f68ca34e.png"
          height={600}
        />
        <h1>
          <Gradient dir="top-to-bottom" from="#5F3BB7" to="#55D4FF">
            You're Subscribed!
          </Gradient>
          {"   "}
          😍
        </h1>
      </Col>
    );
  }

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={<h1 style={styles.title}>Subscribe using Crypto (Rinkeby)</h1>}
      >
        <Timeline mode="left" style={styles.timeline}>
          <Timeline.Item dot="📄">
            <Text style={styles.text}>
              Authenticate by pressing the "Authenticate" button in the top
              right
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="💿">
            Click to{" "}
            <Button
              onClick={(e) => {
                e.preventDefault();
                window.open("http://surgemoon.com", "Surgemoon");
              }}
            >
              Subscribe
            </Button>
          </Timeline.Item>

          <Timeline.Item dot="🧰">
            <Text style={styles.text}>Refresh the page!</Text>
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
}
