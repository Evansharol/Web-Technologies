import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class number extends HttpServlet {

    private long factorial(int n) {
        long fact = 1;
        for (int i = 2; i <= n; i++) fact *= i;
        return fact;
    }

    private boolean isPalindrome(int n) {
        int original = n, reversed = 0;
        while (n > 0) {
            reversed = reversed * 10 + n % 10;
            n /= 10;
        }
        return original == reversed;
    }

    private String fibonacci(int n) {
        StringBuilder sb = new StringBuilder();
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            sb.append(a).append(" ");
            int temp = a + b;
            a = b;
            b = temp;
        }
        return sb.toString();
    }

    private boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    private double cubeRoot(int n) {
        return Math.cbrt(n);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Redirect to the main HTML form
        response.sendRedirect("NumberOperations.html");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            int number = Integer.parseInt(request.getParameter("number"));
            String[] operations = request.getParameterValues("operation");

            // HTML Header with External CSS
            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("    <meta charset='UTF-8'>");
            out.println("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            out.println("    <title>Calculation Results</title>");
            out.println("    <link rel='stylesheet' type='text/css' href='results.css'>");
            out.println("</head>");
            out.println("<body>");
            
            // Container and Header
            out.println("    <div class='results-container'>");
            out.println("        <div class='header'>");
            out.println("            <h1>Calculation Results</h1>");
            out.println("            <div class='number-display'>Number: " + number + "</div>");
            out.println("        </div>");

            // Results Section
            if (operations != null && operations.length > 0) {
                out.println("        <div class='results-grid'>");
                
                for (String op : operations) {
                    switch (op) {
                        case "factorial":
                            out.println("            <div class='result-card'>");
                            out.println("                <div class='result-title'>");
                            out.println("                    <div class='result-icon'>n!</div>");
                            out.println("                    Factorial");
                            out.println("                </div>");
                            out.println("                <div class='result-value'>" + factorial(number) + "</div>");
                            out.println("            </div>");
                            break;
                            
                        case "palindrome":
                            out.println("            <div class='result-card'>");
                            out.println("                <div class='result-title'>");
                            out.println("                    <div class='result-icon'>↔</div>");
                            out.println("                    Palindrome Check");
                            out.println("                </div>");
                            out.println("                <div class='result-value'>" + 
                                (isPalindrome(number) ? "Yes, this is a palindrome" : "No, this is not a palindrome") + "</div>");
                            out.println("            </div>");
                            break;
                            
                        case "fibonacci":
                            out.println("            <div class='result-card'>");
                            out.println("                <div class='result-title'>");
                            out.println("                    <div class='result-icon'>∞</div>");
                            out.println("                    Fibonacci Sequence");
                            out.println("                </div>");
                            out.println("                <div class='result-value'>" + fibonacci(number) + "</div>");
                            out.println("            </div>");
                            break;
                            
                        case "prime":
                            out.println("            <div class='result-card'>");
                            out.println("                <div class='result-title'>");
                            out.println("                    <div class='result-icon'>P</div>");
                            out.println("                    Prime Check");
                            out.println("                </div>");
                            out.println("                <div class='result-value'>" + 
                                (isPrime(number) ? "Yes, this is a prime number" : "No, this is not a prime number") + "</div>");
                            out.println("            </div>");
                            break;
                            
                        case "cuberoot":
                            out.println("            <div class='result-card'>");
                            out.println("                <div class='result-title'>");
                            out.println("                    <div class='result-icon'>∛</div>");
                            out.println("                    Cube Root");
                            out.println("                </div>");
                            out.println("                <div class='result-value'>" + String.format("%.4f", cubeRoot(number)) + "</div>");
                            out.println("            </div>");
                            break;
                    }
                }
                out.println("        </div>");
            } else {
                out.println("        <div class='no-results'>");
                out.println("            <p>No operation selected.</p>");
                out.println("            <p>Please go back and select at least one operation.</p>");
                out.println("        </div>");
            }

            // Back Button
            out.println("        <div style='text-align: center;'>");
            out.println("            <a href='NumberOperations.html' class='back-button'>← Calculate Another Number</a>");
            out.println("        </div>");
            out.println("    </div>");
            out.println("</body>");
            out.println("</html>");

        } catch (NumberFormatException e) {
            // Error Page with External CSS
            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("    <meta charset='UTF-8'>");
            out.println("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            out.println("    <title>Error - Invalid Input</title>");
            out.println("    <link rel='stylesheet' type='text/css' href='results.css'>");
            out.println("</head>");
            out.println("<body>");
            out.println("    <div class='results-container'>");
            out.println("        <div class='header'>");
            out.println("            <h1 class='error-title'>Invalid Input</h1>");
            out.println("        </div>");
            out.println("        <div class='no-results'>");
            out.println("            <p>Please enter a valid number.</p>");
            out.println("        </div>");
            out.println("        <div style='text-align: center;'>");
            out.println("            <a href='NumberOperations.html' class='back-button'>← Go Back</a>");
            out.println("        </div>");
            out.println("    </div>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}