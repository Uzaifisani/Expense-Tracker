package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses(Authentication authentication) {
        return ResponseEntity.ok(expenseService.getAllExpenses(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense, Authentication authentication) {
        return ResponseEntity.ok(expenseService.createExpense(expense, authentication.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id, Authentication authentication){
        return ResponseEntity.ok(expenseService.getExpenseById(id, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @Valid @RequestBody Expense expense, Authentication authentication) {
        return ResponseEntity.ok(expenseService.updateExpense(id, expense, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id, Authentication authentication) {
        expenseService.deleteExpense(id, authentication.getName());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/byDateBetween")
    public ResponseEntity<List<Expense>> getExpensesByDateRange( @RequestParam String startDate, @RequestParam String endDate, Authentication authentication){
        return ResponseEntity.ok(expenseService.getExpensesOfDateRange(authentication.getName(),startDate, endDate));
    }
    @GetMapping("/byDate")
    public ResponseEntity<List<Expense>> getExpensesByDate(@RequestParam String date, Authentication authentication){
        return ResponseEntity.ok(expenseService.getExpensesByDate(authentication.getName(),date));
    }

    @GetMapping("/byCategoryAndDateRange")
    public ResponseEntity<List<Expense>> getExpensesByCategoryAndDateRange(@RequestParam String Category, @RequestParam String startdate,@RequestParam String endDate ,Authentication authentication){
        return ResponseEntity.ok(expenseService.getExpensesByCategoryAndDateRange(authentication.getName(),startdate,endDate,Category));
    }
    @GetMapping("/byCategory")
    public ResponseEntity<List<Expense>> getExpensesByCategory(@RequestParam String Category, @RequestParam String date,Authentication authentication){
        return ResponseEntity.ok(expenseService.getExpensesByCategoryAndDate(authentication.getName(),date,Category));
    }
} 