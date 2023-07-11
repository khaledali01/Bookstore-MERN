import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div
      className="d-flex justify-content-center bg-info"
      style={{ height: "50px", alignItems: "center" }}
    >
      <FontAwesomeIcon
        className="m-2"
        icon={faFacebook}
        size="xl"
        style={{ color: "white" }}
      />
      <FontAwesomeIcon
        className="m-2"
        icon={faInstagram}
        size="xl"
        style={{ color: "white" }}
      />
      <FontAwesomeIcon
        className="m-2"
        icon={faTwitter}
        size="xl"
        style={{ color: "white" }}
      />
      <FontAwesomeIcon
        className="m-2"
        icon={faPhone}
        size="xl"
        style={{ color: "white" }}
      />
      <FontAwesomeIcon
        className="m-2"
        icon={faLinkedin}
        size="xl"
        style={{ color: "white" }}
      />
    </div>
  );
};

export default Header;
