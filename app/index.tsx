import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import { COLORS, FONT, SPACING, shadowStyle } from '../constants/styles';
import { Task } from '../types/task';

/**
 * Main task management screen.
 * Handles creating, completing, and deleting tasks,
 * with separate sections for todo and completed items.
 */
export default function Index() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Memoized to prevent unnecessary re-renders on every input change
  const sections = useMemo(() => {
    const todoTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);
    
    return [
      { title: 'To Do', data: todoTasks },
      ...(completedTasks.length > 0 ? [{ title: 'Completed', data: completedTasks }] : [])
    ];
  }, [tasks]);

  const addTask = () => {
    if (!taskText.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    setTasks(prev => [
      { id: Date.now().toString(), text: taskText.trim(), completed: false },
      ...prev,
    ]);
    setTaskText('');
  };

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const renderSectionHeader = ({ section: { title, data } }: {
    section: { title: string; data: Task[] }
  }) => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.taskCount}>{data.length}</Text>
        </View>
      </View>
      {title === 'To Do' && data.length === 0 && (
        <Text style={[styles.emptyMessage, { marginTop: SPACING.vertical.md }]}>
          No tasks to do
        </Text>
      )}
    </View>
  );

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggleComplete={() => toggleComplete(item.id)}
      onDelete={() => deleteTask(item.id)}
    />
  );

  const trimmedText = taskText.trim();
  const isValidTask = trimmedText.length > 0;

  return (
    <KeyboardAvoidingView
      // iOS requires padding adjustment, Android handles it automatically
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.title}>Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor={COLORS.textLight}
          value={taskText}
          onChangeText={setTaskText}
          returnKeyType="done"
          onSubmitEditing={addTask}
          maxLength={100}
        />
        <TouchableOpacity
          onPress={addTask}
          style={[styles.addButton, !isValidTask && styles.addButtonDisabled]}
          disabled={!isValidTask}
        >
          <MaterialCommunityIcons
            name="plus"
            size={22}
            color={isValidTask ? COLORS.white : COLORS.textLight}
          />
        </TouchableOpacity>
      </View>

      <SectionList
        contentContainerStyle={styles.listContent}
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  } as ViewStyle,
  title: {
    fontSize: FONT.title.size,
    fontWeight: FONT.title.weight,
    color: COLORS.text,
    marginHorizontal: SPACING.horizontal,
    marginTop: 60,
    marginBottom: SPACING.vertical.lg,
  } as TextStyle,
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.horizontal,
    marginBottom: SPACING.vertical.xl,
  } as ViewStyle,
  input: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: FONT.task.size,
    marginRight: SPACING.vertical.md,
    ...shadowStyle,
  } as TextStyle,
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadowStyle,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
  } as ViewStyle,
  addButtonDisabled: {
    backgroundColor: COLORS.disabled,
  } as ViewStyle,
  listContent: {
    paddingBottom: SPACING.vertical.xxl,
  } as ViewStyle,
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.horizontal,
    marginBottom: SPACING.vertical.md,
    paddingTop: SPACING.vertical.lg,
    minHeight: 60,
    backgroundColor: COLORS.background,
  } as ViewStyle,
  sectionTitle: {
    fontSize: FONT.section.size,
    fontWeight: FONT.section.weight,
    color: COLORS.text,
  } as TextStyle,
  countBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.vertical.md,
    paddingVertical: SPACING.vertical.xs,
    borderRadius: 12,
  } as ViewStyle,
  taskCount: {
    fontSize: FONT.task.size,
    color: COLORS.primary,
    fontWeight: FONT.task.weight,
  } as TextStyle,
  emptyMessage: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: FONT.task.size,
    marginTop: SPACING.vertical.lg,
    fontWeight: FONT.task.weight,
  } as TextStyle,
});