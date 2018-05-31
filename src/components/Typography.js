import { Text, StyleSheet } from 'react-native';

import React from 'react';

import { colors, typography } from 'styles';

const Light = ({ style, ...otherProps }) => (
  <Text style={[styles.light, style]} {...otherProps} />
);
Light.propTypes = Text.propTypes;

const Heading = ({ style, ...otherProps }) => (
  <Text style={[styles.heading, style]} {...otherProps} />
);
Heading.propTypes = Text.propTypes;

const SubHeading = ({ style, ...otherProps }) => (
  <Text style={[styles.subheading, style]} {...otherProps} />
);
SubHeading.propTypes = Text.propTypes;

const GrayedOut = ({ style, ...otherProps }) => (
  <Text style={[styles.grayedOut, style]} {...otherProps} />
);
GrayedOut.propTypes = Text.propTypes;

const SemiBold = ({ style, ...otherProps }) => (
  <Text style={[styles.semiBold, style]} {...otherProps} />
);
SemiBold.propTypes = Text.propTypes;

const Small = ({ style, ...otherProps }) => (
  <Text style={[styles.small, style]} {...otherProps} />
);
Small.propTypes = Text.propTypes;

const ButtonText = ({ style, ...otherProps }) => (
  <Text style={[styles.small, style]} {...otherProps} />
);
ButtonText.propTypes = Text.propTypes;

const Price = ({ style, ...otherProps }) => (
  <Text style={[styles.price, style]} {...otherProps} />
);
Price.propTypes = Text.propTypes;

const PriceLarge = ({ style, ...otherProps }) => (
  <Text style={[styles.priceLarge, style]} {...otherProps} />
);
PriceLarge.propTypes = Text.propTypes;

const PriceHeading = ({ style, ...otherProps }) => (
  <Text style={[styles.priceHeading, style]} {...otherProps} />
);
PriceHeading.propTypes = Text.propTypes;

const TitleAlternate = ({ style, ...otherProps }) => (
  <Text style={[styles.titleAlternate, style]} {...otherProps} />
);
TitleAlternate.propTypes = Text.propTypes;

const SemiBoldAlternate = ({ style, ...otherProps }) => (
  <Text style={[styles.semiBoldAlternate, style]} {...otherProps} />
);
SemiBoldAlternate.propTypes = Text.propTypes;

const SubtitleAlternate = ({ style, ...otherProps }) => (
  <Text style={[styles.subtitleAlternate, style]} {...otherProps} />
);
SubtitleAlternate.propTypes = Text.propTypes;

const SmallAlternate = ({ style, ...otherProps }) => (
  <Text style={[styles.smallAlternate, style]} {...otherProps} />
);
SmallAlternate.propTypes = Text.propTypes;

const Paragraph = ({ style, ...otherProps }) => (
  <Text style={[styles.base, style]} {...otherProps} />
);
Paragraph.propTypes = Text.propTypes;

const baseType = {
  fontFamily: typography.family.primary,
  color: colors.grayDarker,
  letterSpacing: typography.letterSpacing.normal,
};

const styles = StyleSheet.create({
  light: {
    ...baseType,
    fontSize: typography.size.normal,
  },
  heading: {
    ...baseType,
    fontWeight: 'bold',
    fontSize: typography.size.lg,
    letterSpacing: typography.letterSpacing.sm,
  },
  subheading: {
    ...baseType,
    fontSize: typography.size.md,
  },
  grayedOut: {
    ...baseType,
    fontSize: typography.size.normal,
    color: colors.gray,
  },
  semiBold: { ...baseType },
  small: {
    ...baseType,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  price: {
    ...baseType,
    fontSize: typography.size.lg,
    letterSpacing: typography.letterSpacing.md,
  },
  priceLarge: {
    ...baseType,
    fontSize: typography.size.xl,
    color: colors.white,
  },
  priceHeading: {
    ...baseType,
    fontSize: typography.size.xxl,
    color: colors.white,
  },
  titleAlternate: {
    ...baseType,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
  },
  semiBoldAlternate: {
    ...baseType,
  },
  subtitleAlternate: {
    ...baseType,
    fontSize: typography.size.sm,
    color: colors.greenLighter,
    letterSpacing: typography.letterSpacing.md,
  },
  smallAlternate: {
    ...baseType,
    fontSize: typography.size.sm,
    letterSpacing: typography.letterSpacing.md,
  },
  buttonText: {
    ...baseType,
    fontSize: typography.size.sm,
    color: colors.white,
  },
  largeTitle: {
    fontWeight: typography.weight.normal,
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.11,
  },
  title1: {
    fontWeight: typography.weight.normal,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: 0.13,
  },
  title2: {
    fontWeight: typography.weight.normal,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.16,
  },
  title3: {
    fontWeight: typography.weight.normal,
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.19,
  },
  headline: {
    fontWeight: typography.weight.semiBold,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.24,
  },
  body: {
    fontWeight: typography.weight.normal,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.24,
  },
  callout: {
    fontWeight: typography.weight.normal,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  subhead: {
    fontWeight: typography.weight.normal,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.16,
  },
  footnote: {
    fontWeight: typography.weight.normal,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.6,
  },
  caption1: {
    fontWeight: typography.weight.normal,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.0,
  },
  caption2: {
    fontWeight: typography.weight.normal,
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.6,
  },
});

export default {
  ButtonText,
  GrayedOut,
  Heading,
  Light,
  Paragraph,
  Price,
  PriceHeading,
  PriceLarge,
  SemiBold,
  SemiBoldAlternate,
  Small,
  SmallAlternate,
  SubHeading,
  SubtitleAlternate,
  TitleAlternate,
};
