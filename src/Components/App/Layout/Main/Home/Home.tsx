import React from "react";
import { Carousel } from "react-bootstrap";

import slider1 from "assets/img/slider1.jpg";
import slider2 from "assets/img/slider2.jpg";
import slider3 from "assets/img/slider3.jpg";
import bottom1 from "assets/img/main_quick1.jpg";
import bottom2 from "assets/img/main_quick2.jpg";

const Home = () => {
  const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

  return (
    <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
      <Carousel>
        <Carousel.Item>
          <img width="100%" height="100%" src={slider1} />
          <Carousel.Caption>
            <h3>스스로 견적내고 비교하여</h3>
            <p>저렴하게 렌트하는 '마이카카'</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" height="100%" src={slider2} />
          <Carousel.Caption>
            <h3>이제는 투명한 가격비교를 통해</h3>
            <p>합리적인 가격으로 렌트하세요</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width="100%" height="100%" src={slider3} />
          <Carousel.Caption>
            <h3>마이카카와 함께라면</h3>
            <p>똑똑한 소비자가 될 수 있습니다</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <img className="background-bottom" src={bottom1} />
      <img className="background-bottom" src={bottom2} />
    </div>
  );
};

export default Home;
