package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Expense> getAllExpenses(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return expenseRepository.findByUserOrderByDateDesc(user);
    }

    @Transactional
    public Expense createExpense(Expense expense, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    @Transactional
    public Expense updateExpense(Long id, Expense updatedExpense, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!existingExpense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to update this expense");
        }

        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setDate(updatedExpense.getDate());

        return expenseRepository.save(existingExpense);
    }

    @Transactional
    public void deleteExpense(Long id, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to delete this expense");
        }

        expenseRepository.deleteByIdAndUser(id, user);
    }
    public List<Expense> getExpensesOfDateRange( String username, String startDate, String endDate){
        System.out.println(username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate startDateF= LocalDate.parse(startDate, formatter);
        LocalDate endDateF= LocalDate.parse(endDate, formatter);
        return expenseRepository.findByDateBetweenAndUser(startDateF, endDateF,user);
    }
    public List<Expense> getExpensesByDate( String username, String date){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate dateF= LocalDate.parse(date, formatter);
        return expenseRepository.findByDateAndUser(dateF,user);
    }
    public List<Expense> getExpensesByCategoryAndDateRange( String username, String startDate, String endDate, String category){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate startDateF= LocalDate.parse(startDate, formatter);
        LocalDate endDateF= LocalDate.parse(endDate, formatter);
        return expenseRepository.findByCategoryAndDateBetweenAndUser(category,startDateF,endDateF,user);
    }

    public List<Expense> getExpensesByCategoryAndDate(String username, String date, String category){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate dateF= LocalDate.parse(date, formatter);
        return expenseRepository.findByCategoryAndDateAndUser(category,dateF,user);
    }

    public Expense getExpenseById(Long id, String name) {
        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return expenseRepository.findByIdAndUser(id, user);
    }
}