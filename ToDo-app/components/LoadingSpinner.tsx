import { ActivityIndicator, View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'

const LoadingSpinner = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
        <View style={homeStyles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={homeStyles.loadingText}>Loading your todos...</Text>
        </View>
    </LinearGradient>
  )
}

export default LoadingSpinner;