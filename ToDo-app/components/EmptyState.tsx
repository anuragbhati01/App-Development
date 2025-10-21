import { View, Text } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createHomeStyles } from '@/assets/styles/home.styles';

const EmptyState = () => {
    const { colors } = useTheme();

    const homeStyles = createHomeStyles(colors);

  return (
    
    <View style={homeStyles.emptyContainer}>
        <LinearGradient style={homeStyles.emptyIconContainer} colors={colors.gradients.empty}>
            <Ionicons name="clipboard-outline" size={60} color={colors.textMuted} />
        </LinearGradient>
        <Text style={homeStyles.emptyText}>No Todos yet!</Text>
        <Text style={homeStyles.emptySubtext}>Add your first todo above to get started</Text>
    </View>
  );
}

export default EmptyState