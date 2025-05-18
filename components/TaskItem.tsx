import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CHECKBOX_SIZE, COLORS, shadowStyle } from '../constants/styles';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: () => void;
  onDelete: () => void;
}

/**
 * TaskItem displays an individual task with a tappable checkbox and delete icon.
 */
export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Pressable checkbox with visual feedback on press */}
        <Pressable
          onPress={onToggleComplete}
          style={({ pressed }) => [
            styles.checkboxContainer,
            // Apply pressed state styling for visual feedback
            pressed && styles.checkboxPressed,
          ]}
        >
          {/* Checkbox circle with dynamic styling based on completion state */}
          <View
            style={[
              styles.checkbox,
              // Switch between completed and incomplete styling
              task.completed ? styles.checkedBox : styles.uncheckedBox,
            ]}
          >
            <MaterialCommunityIcons
              name="check"
              size={CHECKBOX_SIZE.icon}
              // Icon color changes based on completion state
              color={task.completed ? COLORS.white : COLORS.iconLight}
              style={styles.checkIcon}
            />
          </View>
        </Pressable>

        {/* Task text with 2-line limit to maintain consistent card height */}
        <Text style={styles.taskText} numberOfLines={2}>
          {task.text}
        </Text>

        {/* Delete button with expanded touch target for better UX */}
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
          // Expanded touch target for better mobile interaction
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={CHECKBOX_SIZE.icon}
            color={COLORS.iconMedium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    ...shadowStyle,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    borderRadius: CHECKBOX_SIZE.container,
    padding: 4,
    marginRight: 12,
  },
  checkboxPressed: {
    backgroundColor: COLORS.primaryLight,
  },
  checkbox: {
    width: CHECKBOX_SIZE.box,
    height: CHECKBOX_SIZE.box,
    borderRadius: CHECKBOX_SIZE.box / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  uncheckedBox: {
    borderColor: COLORS.primary,
  },
  checkedBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkIcon: {
    marginTop: -1,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  deleteButton: {
    padding: 6,
    marginLeft: 12,
  },
});