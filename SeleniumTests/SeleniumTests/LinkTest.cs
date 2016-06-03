using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace SeleniumTests
{
    [TestFixture]
    public class LinkTest
    {
        private IWebDriver driver;
        private StringBuilder verificationErrors;
        private string baseURL;
        private bool acceptNextAlert = true;
        
        [SetUp]
        public void SetupTest()
        {
            driver = new FirefoxDriver();
            baseURL = "http://localhost:8080/";
            verificationErrors = new StringBuilder();
        }
        
        [TearDown]
        public void TeardownTest()
        {
            try
            {
                driver.Quit();
            }
            catch (Exception)
            {
                // Ignore errors if unable to close the browser
            }
            Assert.AreEqual("", verificationErrors.ToString());
        }
        
        [Test]
        public void TheLinkTest()
        {
            driver.Navigate().GoToUrl(baseURL);
            driver.FindElement(By.Id("btnNew")).Click();
            driver.FindElement(By.Id("txtSellerName")).Clear();
            driver.FindElement(By.Id("txtSellerName")).SendKeys("tim");
            driver.FindElement(By.Id("txtAddress")).Clear();
            driver.FindElement(By.Id("txtAddress")).SendKeys("41 ottawa st");
            driver.FindElement(By.Id("txtPhone")).Clear();
            driver.FindElement(By.Id("txtPhone")).SendKeys("(519) 666-7777");
            driver.FindElement(By.Id("txtEmail")).Clear();
            driver.FindElement(By.Id("txtEmail")).SendKeys("tim@t.com");
            new SelectElement(driver.FindElement(By.Id("cmbMake"))).SelectByText("Ford");
            driver.FindElement(By.Id("txtModel")).Clear();
            driver.FindElement(By.Id("txtModel")).SendKeys("Focus");
            new SelectElement(driver.FindElement(By.Id("cmbYear"))).SelectByText("2003");
            driver.FindElement(By.Id("btnSubmit")).Click();
            driver.FindElement(By.Id("lnkJDPower")).Click();
        }
        private bool IsElementPresent(By by)
        {
            try
            {
                driver.FindElement(by);
                return true;
            }
            catch (NoSuchElementException)
            {
                return false;
            }
        }
        
        private bool IsAlertPresent()
        {
            try
            {
                driver.SwitchTo().Alert();
                return true;
            }
            catch (NoAlertPresentException)
            {
                return false;
            }
        }
        
        private string CloseAlertAndGetItsText() {
            try {
                IAlert alert = driver.SwitchTo().Alert();
                string alertText = alert.Text;
                if (acceptNextAlert) {
                    alert.Accept();
                } else {
                    alert.Dismiss();
                }
                return alertText;
            } finally {
                acceptNextAlert = true;
            }
        }
    }
}
