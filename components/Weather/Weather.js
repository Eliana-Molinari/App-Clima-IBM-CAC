import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import InputSearch from "../InputSearch/InputSearch";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import Maps from "../Maps/Maps";

const Weather = ({
  resultado,
  fetchClima,
  viewInputSearch = true,
  ListWeather,
  margin = false,
  colorText,
}) => {
  const d = new Date();
  let hours = d.toLocaleTimeString();
  const {
    name,
    weather,
    main: { temp, temp_min, temp_max, humidity },
    wind: { speed },
    coord: { lat, lon },
  } = resultado;
  const kelvin = 273.15;

  let marginProps = margin ? 10 : 40;
  const WeatherIcon = (weather) => {
    if (weather[0].main == "Sunny") {
      return <Fontisto name="day-sunny" size={50} color={colorText} />;
    }
    if (weather[0].main == "Rain") {
      return <Ionicons name="rainy" size={50} color={colorText} />;
    }
    if (weather[0].main == "Clouds") {
      return <Ionicons name="ios-cloudy-outline" size={50} color={colorText} />;
    }
    if (weather[0].main == "Clear") {
      return <Fontisto name="night-clear" size={50} color={colorText} />;
    }
    if (weather[0].main == "Snow") {
      return <Feather name="cloud-snow" size={50} color={colorText} />;
    }
  };
  return (
    <View>
      {viewInputSearch ? (
        <InputSearch
          fetchClima={fetchClima}
          ListWeather={ListWeather}
          colorText={colorText}
        />
      ) : null}
      <View style={{ ...styles.container, marginVertical: marginProps }}>
        <View style={{ ...styles.hourInfo }}>
          <Text style={{ color: colorText }}>{hours}</Text>
        </View>
        <View style={styles.titleInfo}>
          <Text style={{ ...styles.titleInfo, fontSize: 18, color: colorText }}>
            {name}
          </Text>
        </View>
        <View style={styles.extraInfo}>
          <Text
            style={{
              ...styles.headerText,
              fontWeight: "bold",
              color: colorText,
            }}
          >
            {parseInt(temp - kelvin)}°
          </Text>
          <View style={styles.icon}>
            {WeatherIcon(weather)}
            <Text style={{ ...styles.headerDescrip, color: colorText }}>
              {weather[0].description}
            </Text>
          </View>
        </View>
        <View style={styles.containerTemp}>
          <Text
            style={{ ...styles.headerText, fontSize: 20, color: colorText }}
          >
            Min: {parseInt(temp_min - kelvin)}°
          </Text>
          <Text
            style={{ ...styles.headerText, fontSize: 20, color: colorText }}
          >
            Max: {parseInt(temp_max - kelvin)}°
          </Text>
        </View>
        <View style={styles.containerButtom}>
          <View>
            <Maps lat={lat} lon={lon} />
          </View>
          <View
            style={{
              ...styles.dividerHorizontal,
              borderBottomColor: colorText,
            }}
          />
          <View style={styles.containerInfo}>
            <View styles={{ alignItems: "center" }}>
              <Text style={{ ...styles.infoText, color: colorText }}>
                Viento
              </Text>
              <Text style={{ ...styles.infoText, color: colorText }}>
                {speed}
              </Text>
              <Text style={{ ...styles.infoText, color: colorText }}>KM/H</Text>
              <View style={styles.infoBar}>
                <View
                  style={{
                    width: speed / 2,
                    height: 6,
                    backgroundColor: "#69F0AE",
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ ...styles.infoText, color: colorText }}>
                Humedad
              </Text>
              <Text style={{ ...styles.infoText, color: colorText }}>
                {humidity}
              </Text>
              <Text style={{ ...styles.infoText, color: colorText }}>%</Text>
              <View style={styles.infoBar}>
                <View
                  style={{
                    width: humidity / 2,
                    height: 6,
                    backgroundColor: "#69F0AE",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
  hourInfo: {
    fontSize: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  titleInfo: {
    marginTop: 10,
  },
  headerText: {
    fontSize: 80,
    marginTop: 5,
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 10,
  },
  headerDescrip: {
    fontSize: 12,
  },
  icon: {
    marginTop: 40,
    marginRight: 30,
  },
  containerTemp: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  imgIcon: {
    width: 50,
    height: 50,
  },
  dividerHorizontal: {
    marginHorizontal: 10,
    marginTop: 10,
    borderBottomWidth: 1,
  },
  containerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  infoText: {
    textShadowColor: "rgba(242, 242, 242, 0.9)",
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  infoBar: {
    marginVertical: 10,
    width: 45,
    height: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  containerButtom: {
    marginTop: 40,
  },
});
