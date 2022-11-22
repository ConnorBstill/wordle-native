import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";

import {
  inputLetter,
  removeLetter,
  guessWord,
} from "../../redux/actions/GuessActions";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";

import { WHITE, GREEN, DARK_YELLOW, GRAY } from "../../colors";

const LetterKey = ({ title }: { title: string }) => {
  const { guessedLetters, correctWord, guessedWords } = useAppSelector(
    (state) => state.letters
  );
  const { buttonStyle, letterStyle } = styles;

  const dispatch = useAppDispatch();

  const handlePress = () => {
    if (title === "backspace-outline") {
      dispatch(removeLetter());
    } else if (title === "ENTER") {
      dispatch(guessWord());
    } else {
      dispatch(inputLetter(title));
    }
  };

  const setKeyBackground = (letter: string, letterIndex: number) => {
    // const { correctWord, guessNumber } = storeState;
    let color;

    guessedWords.forEach((word: string) => {
      if (
        correctWord.indexOf(title) !== -1 &&
        correctWord.indexOf(title) === word.indexOf(title)
      ) {
        color = GREEN;
      } else if (
        correctWord.indexOf(title) !== -1 &&
        correctWord.indexOf(title) !== word.indexOf(title)
      ) {
        color = DARK_YELLOW;
      } else if (correctWord.indexOf(title) === -1) {
        color = GRAY;
      }
    });

    if (guessedLetters.includes(title) && correctWord[letterIndex] === letter) {
      return { backgroundColor: GREEN };
    } else if (
      correctWord.includes(letter) &&
      correctWord[letterIndex] !== letter
    ) {
      return { backgroundColor: DARK_YELLOW };
    }
  };

  const setKeyWidth = () => {
    return { width: title.length > 1 ? 50 : 32 };
  };

  const renderLabel = () => {
    if (title === "backspace-outline") {
      return <Icon name={title} type="ionicon" color={WHITE} />;
    } else {
      return <Text style={letterStyle}>{title}</Text>;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => handlePress()}
        style={[{ ...buttonStyle, ...setKeyWidth() }]}
      >
        {renderLabel()}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#818384",
    height: 58,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },
  widerButton: {},
  letterStyle: {
    color: "#fff",
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
});

export default LetterKey;
