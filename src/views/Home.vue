<template>
  <div>
    <div
      id="topMenu_div"
      class="position-sticky"
      style="position: relative; z-index: 1000"
    >
      <TopMenu />
    </div>

    <div
      class="w3-main w3-content w3-padding"
      style="max-width:1200px;margin-top:50px"
    >
      <div>
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            caption="Primer Slide"
            text="Carrusel primera imagen"
          >
            <template v-slot:img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                src="../assets/food.jpg"
                alt="image slot"
                style="height: 30vw; max-height: 480px"
              />
            </template>
          </b-carousel-slide>

          <b-carousel-slide
            caption="Segundo Slide"
            text="Carrusel segunda imagen"
          >
            <template v-slot:img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                src="../assets/coffee.jpg"
                alt="image slot"
                style="height: 30vw; max-height: 480px"
              />
            </template>
          </b-carousel-slide>

          <b-carousel-slide
            caption="Tercer Slide"
            text="Carrusel tercera imagen"
          >
            <template v-slot:img>
              <img
                class="d-block img-fluid w-100"
                width="1024"
                src="../assets/notes.jpg"
                alt="image slot"
                style="height: 30vw; max-height: 480px"
              />
            </template>
          </b-carousel-slide>
        </b-carousel>
      </div>
    </div>
    <div>
      <Category />
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import TopMenu from "../components/TopMenu.vue";
import Category from "../components/Category.vue";
import Footer from "../components/Footer";
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  components: {
    TopMenu,
    Category,
    Footer,
  },
};
</script>


