<template>
  <div
    class="flex flex-col flex-1 items-center"
    v-if="this.weatherDataResult !== null"
  >
    <!--Weather Overview-->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ $route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(this.weatherDataResult.currentTime).toLocaleDateString(
            "en-us",
            {
              weekday: "long",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        -
        {{
          new Date(this.weatherDataResult.currentTime).toLocaleTimeString({
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(this.weatherDataResult.current.temp) }} &deg;
      </p>
      <p>
        Feels like
        {{ Math.round(this.weatherDataResult.current.feels_like) }} &deg;
      </p>
      <p class="capitalize">
        {{ this.weatherDataResult.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${this.weatherDataResult.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-auto hover:overflow-x-scroll">
          <div
            v-for="hourData in weatherDataResult.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                  minute: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherDataResult.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }} &deg;</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      apiKey: "047ef9c3516e552807a6bbd0067851ce",
      weatherDataResult: null,
      localOffset: null,
      utc: null,
    };
  },
  name: "AsyncCityView",
  mounted() {
    this.getWeatherData();
  },
  methods: {
    async getWeatherData() {
      try {
        const weatherData = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.$route.query.lat}&lon=${this.$route.query.lng}&exclude={part}&appid=${this.apiKey}&units=metric`
        );
        this.weatherDataResult = weatherData.data;
        // cal current date & time
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = this.weatherDataResult.current.dt * 1000 + localOffset;
        this.weatherDataResult.currentTime =
          utc + 1000 * this.weatherDataResult.timezone_offset;

        // // cal hourly weather offset
        this.weatherDataResult.hourly.forEach((hour) => {
          const utc = hour.dt * 1000 + localOffset;
          hour.currentTime =
            utc + 1000 * this.weatherDataResult.timezone_offset;
        });
        console.log(this.weatherDataResult);
        return this.weatherDataResult.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
