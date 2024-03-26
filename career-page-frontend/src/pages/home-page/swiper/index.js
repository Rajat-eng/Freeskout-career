import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import style from "../index.module.css";


const SwiperComponent = () => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        spaceBetween={10}
        grabCursor={true}
        slidesPerView={"3"}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          800: { slidesPerView: "3" },
          680: { slidesPerView: "2.5"},
          545: {slidesPerView: "1.8"},
          400 : {slidesPerView : "1.5"},
          280 : {slidesPerView : "1.2"}
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 2,
          slideShadows: false,
        }}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="my-swiper"
      >
        <SwiperSlide>
          <div className={`swiper-slide ${style.empDetailsCardChild}`}>
            <div className={style.empDetailsQuotes}>
              <blockquote>
                <q>
                  &nbsp; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Minima, necessitatibus fugit exercitationem expedita
                  quasi nulla adipisci distinctio. Lorem ipsum dolor sit.
                </q>
              </blockquote>
            </div>
            <div className={style.quotesProfile}>
              <img
                src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                alt="dp1"
              />
              <div className={style.quotesProfileDetails}>
                <h6>Rajat Verma</h6>
                <p>rajatverma@freeskout</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`swiper-slide ${style.empDetailsCardChild}`}>
            <div className={style.empDetailsQuotes}>
              <blockquote>
                <q>
                  &nbsp; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Minima, necessitatibus fugit exercitationem expedita
                  quasi nulla adipisci distinctio. Lorem ipsum dolor sit.
                </q>
              </blockquote>
            </div>
            <div className={style.quotesProfile}>
              <img
                src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                alt="dp1"
              />
              <div className={style.quotesProfileDetails}>
                <h6>Rajat Verma</h6>
                <p>rajatverma@freeskout</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`swiper-slide ${style.empDetailsCardChild}`}>
            <div className={style.empDetailsQuotes}>
              <blockquote>
                <q>
                  &nbsp; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Minima, necessitatibus fugit exercitationem expedita
                  quasi nulla adipisci distinctio. Lorem ipsum dolor sit.
                </q>
              </blockquote>
            </div>
            <div className={style.quotesProfile}>
              <img
                src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                alt="dp1"
              />
              <div className={style.quotesProfileDetails}>
                <h6>Rajat Verma</h6>
                <p>rajatverma@freeskout</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`swiper-slide ${style.empDetailsCardChild}`}>
            <div className={style.empDetailsQuotes}>
              <blockquote>
                <q>
                  &nbsp; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Minima, necessitatibus fugit exercitationem expedita
                  quasi nulla adipisci distinctio. Lorem ipsum dolor sit.
                </q>
              </blockquote>
            </div>
            <div className={style.quotesProfile}>
              <img
                src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                alt="dp1"
              />
              <div className={style.quotesProfileDetails}>
                <h6>Rajat Verma</h6>
                <p>rajatverma@freeskout</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`swiper-slide ${style.empDetailsCardChild}`}>
            <div className={style.empDetailsQuotes}>
              <blockquote>
                <q>
                  &nbsp; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Minima, necessitatibus fugit exercitationem expedita
                  quasi nulla adipisci distinctio. Lorem ipsum dolor sit.
                </q>
              </blockquote>
            </div>
            <div className={style.quotesProfile}>
              <img
                src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                alt="dp1"
              />
              <div className={style.quotesProfileDetails}>
                <h6>Rajat Verma</h6>
                <p>rajatverma@freeskout</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`swiper-slide ${style.empDetailsCardChild}`}>
            <div className={style.empDetailsQuotes}>
              <blockquote>
                <q>
                  &nbsp; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Minima, necessitatibus fugit exercitationem expedita
                  quasi nulla adipisci distinctio. Lorem ipsum dolor sit.
                </q>
              </blockquote>
            </div>
            <div className={style.quotesProfile}>
              <img
                src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                alt="dp1"
              />
              <div className={style.quotesProfileDetails}>
                <h6>Rajat Verma</h6>
                <p>rajatverma@freeskout</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`swiper-slide ${style.empDetailsCardChild}`}>
            <div className={style.empDetailsQuotes}>
              <blockquote>
                <q>
                  &nbsp; Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Minima, necessitatibus fugit exercitationem expedita
                  quasi nulla adipisci distinctio. Lorem ipsum dolor sit.
                </q>
              </blockquote>
            </div>
            <div className={style.quotesProfile}>
              <img
                src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
                alt="dp1"
              />
              <div className={style.quotesProfileDetails}>
                <h6>Rajat Verma</h6>
                <p>rajatverma@freeskout</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <div className={style.blobCircleLeftRight}>
          <div className="prev">
            <HiArrowLeft />
          </div>
          <div className="next">
            <HiArrowRight />
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default SwiperComponent;
